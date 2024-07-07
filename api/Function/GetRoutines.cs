using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetRoutines
{
    [Function("GetRoutines")]
    public static IEnumerable<Routine> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "getroutines/personId={personId}")]
        HttpRequestData req,
        [SqlInput("select * from dbo.Routine where PersonId = @PersonId;", "SqlConnectionString", parameters: "@PersonId={personId}")]
        IEnumerable<Routine> routines)
    {
        var utcNow = DateTime.UtcNow;
        TimeZoneInfo chicagoZone = TimeZoneInfo.FindSystemTimeZoneById("America/Chicago");
        var chicagoNow = TimeZoneInfo.ConvertTime(utcNow, chicagoZone);
        DayOfWeek[] weekend = [DayOfWeek.Sunday, DayOfWeek.Saturday];
        var isSchoolDay = !weekend.Contains(chicagoNow.DayOfWeek);
        var hour = chicagoNow.Hour;

        return routines.Where(routine => 
            routine.StartHour <= hour && 
            routine.EndHour > hour && 
            routine.ActiveOnSchoolDays && isSchoolDay || routine.ActiveOnNonSchoolDays && !isSchoolDay);
    }
}