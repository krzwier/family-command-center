using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetTasksForRoutine
{
    [Function("GetTasksForRoutine")]
    public static IEnumerable<FamilyCommandCenter.Data.Task> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "getTasksForRoutine/routineId={routineId}")] HttpRequestData req,
        [SqlInput("select * from Task task join RoutineTask routineTask on task.TaskId = routineTask.TaskId where routineTask.RoutineId = @RoutineId; ", "DATABASE_CONNECTION_STRING", parameters: "@RoutineId={routineId}")] IEnumerable<FamilyCommandCenter.Data.Task> tasks)
    {
        return tasks;
    }
}