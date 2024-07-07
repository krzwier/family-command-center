using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class CompleteRoutine
{
    [Function("CompleteRoutine")]
    public static bool Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "completeroutine/routineId={routineId},status={status}")]
        HttpRequestData req,
        [SqlInput("update dbo.Routine set IsCompleted = @Status where RoutineId = @RoutineId;", "SqlConnectionString", parameters: "@RoutineId={routineId},@Status={status}")]
        string success)
    {
        return success == "0";
    }
}