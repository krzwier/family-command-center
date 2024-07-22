using System.Text.Json.Serialization;

namespace FamilyCommandCenter.Response;

public class EventResponse
{
    [JsonPropertyName("title")]
    public string Title { get; set; }
    [JsonPropertyName("start")]
    public string Start {get; set;}
    [JsonPropertyName("end")]
    public string End {get; set;}
    [JsonPropertyName("allDay")]
    public bool AllDay {get; set;}
}