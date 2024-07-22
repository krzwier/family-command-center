using FamilyCommandCenter.Response;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

public static class GetCalendar
{
    [Function("GetCalendar")]
    public static IEnumerable<EventResponse> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "getcalendar")]
        HttpRequestData req,
        string calendar,
        string start,
        string end
    )
    {
        var serviceAccountEmail = System.Environment.GetEnvironmentVariable("SERVICE_ACCOUNT_EMAIL");
        var calendarId = string.Empty;
        switch (calendar) {
            case "personal":
                calendarId = System.Environment.GetEnvironmentVariable("PERSONAL_CALENDAR_ID");
                break;
            case "family":
                calendarId = System.Environment.GetEnvironmentVariable("FAMILY_CALENDAR_ID");
                break;
            case "primaryWork":
                calendarId  = System.Environment.GetEnvironmentVariable("PRIMARY_WORK_CALENDAR_ID");
                break;
            case "secondaryWork":
                calendarId = System.Environment.GetEnvironmentVariable("SECONDARY_WORK_CALENDAR_ID");
                break;
            case "extracurricular":
                calendarId = System.Environment.GetEnvironmentVariable("EXTRACURRICULAR_CALENDAR_ID");
                break;
        }

        ServiceAccountCredential credential = new ServiceAccountCredential(
            new ServiceAccountCredential.Initializer(serviceAccountEmail)
            {
                Scopes = [CalendarService.Scope.CalendarReadonly]
            }.FromPrivateKey(System.Environment.GetEnvironmentVariable("GOOGLE_SERVICE_ACCOUNT_KEY"))
        );

        var service = new CalendarService(new CalendarService.Initializer() {
            HttpClientInitializer = credential,
            ApplicationName = "family-command-center"
        });
        
        EventsResource.ListRequest request = service.Events.List(calendarId);
        request.TimeMinDateTimeOffset = DateTime.Parse(start);
        request.TimeMaxDateTimeOffset = DateTime.Parse(end);
        request.SingleEvents = true;
        var events = request.Execute().Items.Select(item => new EventResponse {
            Title = item.Visibility == "private" ? "Busy" : item.Summary,
            AllDay = item.Start.DateTimeRaw is null,
            Start = item.Start.DateTimeRaw is null 
                ? item.Start.Date.ToString() 
                : item.Start.DateTimeRaw.ToString(),
            End = item.End.DateTimeRaw is null 
                ? item.End.Date.ToString() 
                : item.End.DateTimeRaw.ToString(),
        });
        return events;
    }

}