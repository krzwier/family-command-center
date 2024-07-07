namespace FamilyCommandCenter.Data;

public class Routine
{
    public int RoutineId { get; set; }
    public string RoutineName {get; set;} = "Routine";
    public string RoutineDisplayName {get; set;} = "Routine";
    public int StartHour {get; set;}
    public int EndHour {get; set;}
    public string IconPath {get; set;} = ".";
    public bool ActiveOnSchoolDays {get; set;}
    public bool ActiveOnNonSchoolDays {get; set;}
    public bool IsCompleted {get; set;}
    public int PersonId {get; set; }
}



