using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetPointBalance
{
    [Function("GetPointBalance")]
    public static IEnumerable<PointBalance> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "getpointbalance/personId={personId}")] 
        HttpRequestData req,
        [SqlInput("select * from PointBank where PersonId = @PersonId", "DATABASE_CONNECTION_STRING", parameters: "@PersonId={personId}")] IEnumerable<PointBalance> pointBalances)
    {
        return pointBalances;
    }
}