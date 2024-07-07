using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Extensions.Timer;

namespace FamilyCommandCenter.Function;

public static class ResetRoutines
{
    [Function("ResetRoutines")]
    [FixedDelayRetry(5, "00:00:10")]
    public static void Run([TimerTrigger("0 0 * * *")] TimerInfo timerInfo,
    [SqlInput("update dbo.Routine set isComplete = 0;", "SqlConnectionString")]
        string success
    )
    {
        return;
    }
}