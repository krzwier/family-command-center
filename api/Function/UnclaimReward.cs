using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class UnclaimReward
{
    [Function("UnclaimReward")]
    public static bool Run(
              [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "unclaimreward/personId={personId},rewardId={rewardId}")]
        HttpRequestData req,
        [SqlInput("exec dbo.UnclaimReward @PersonId, @RewardId;", "DATABASE_CONNECTION_STRING", parameters: "@PersonId={personId},@RewardId={rewardId}")]
        IEnumerable<Result> results)
    {
        var result = results.FirstOrDefault();
        return result is null ? false : result.Success;
    }
}