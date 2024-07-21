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
        string start,
        string end
        )
    {
        var serviceAccountEmail = System.Environment.GetEnvironmentVariable("SERVICE_ACCOUNT_EMAIL");
        var calendarId = System.Environment.GetEnvironmentVariable("CALENDAR_ID");

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
        var events = request.Execute().Items.Select(item => new EventResponse {
            Title = item.Summary,
            Start = item.Start.Date,
            End = item.End.Date,
        });
        return events;
    }

}