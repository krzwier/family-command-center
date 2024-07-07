using FamilyCommandCenter.Data;
using FamilyCommandCenter.Response;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetRewards
{
    [Function("GetRewards")]
    public static RewardResponse Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "getrewards/personId={personId}")]
        HttpRequestData req,
        [SqlInput("select * from dbo.Reward;", "SqlConnectionString")]
        IEnumerable<Reward> rewards,
        [SqlInput("select * from dbo.PersonReward where PersonId = @PersonId;", "SqlConnectionString", parameters: "@PersonId={personId}")]
        IEnumerable<PersonReward> personRewards,
        [SqlInput("select Balance from dbo.PointBank where PersonId = @PersonId;", "SqlConnectionString", parameters: "@PersonId={personId}")]
        IEnumerable<PointBalance> pointBalances)
    {
        var pointBalance = pointBalances.FirstOrDefault();

        return new RewardResponse
        {
            PointBalance = pointBalance is null ? 0 : pointBalance.Balance,
            AvailableRewards = rewards,
            ClaimedRewards = personRewards
        };
    }
}