using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class ClaimReward
{
    [Function("ClaimReward")]
    public static bool Run(
              [HttpTrigger(AuthorizationLevel.Function, "get", Route = "claimreward/personId={personId},rewardId={rewardId}")]
        HttpRequestData req,
        [SqlInput("exec dbo.ClaimReward @PersonId, @RewardId;", "SqlConnectionString", parameters: "@PersonId={personId},@RewardId={rewardId}")]
        IEnumerable<Result> results)
    {
        var result = results.FirstOrDefault();
        return result is null ? false : result.Success;
    }
}