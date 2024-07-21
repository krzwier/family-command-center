using System.Security.Cryptography.X509Certificates;
using FamilyCommandCenter.Response;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;


public static class GetCalendar
{
    [Function("GetCalendar")]
    public static IEnumerable<EventResponse> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "getcalendar")]
        HttpRequestData req,
        string start,
        string end
        )
    {
        var serviceAccountEmail = System.Environment.GetEnvironmentVariable("SERVICE_ACCOUNT_EMAIL");
        var calendarId = System.Environment.GetEnvironmentVariable("CALENDAR_ID");
        var certificate = new X509Certificate2(@"key.p12", "notasecret", X509KeyStorageFlags.Exportable);

        ServiceAccountCredential credential = new ServiceAccountCredential(
            new ServiceAccountCredential.Initializer(serviceAccountEmail)
            {
                Scopes = new[] {CalendarService.Scope.CalendarReadonly}
            }.FromCertificate(certificate)
        );

        var service = new CalendarService(new CalendarService.Initializer() {
            HttpClientInitializer = credential,
            ApplicationName = "family-command-center"
        });
        
        EventsResource.ListRequest request = service.Events.List(calendarId);
        request.TimeMinDateTimeOffset = DateTime.Parse(start);
        request.TimeMaxDateTimeOffset = DateTime.Parse(end);
        var events = request.Execute().Items.Select(item => new EventResponse {
            Title = item.Summary,
            Start = item.Start.Date,
            End = item.End.Date,
        });
        return events;
    }

}