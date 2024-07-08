using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class IncrementPointBalance
{
    [Function("IncrementPointBalance")]
    public static IEnumerable<PointBalance> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "incrementpointbalance/personId={personId}")] 
        HttpRequestData req,
        [SqlInput("exec dbo.IncrementPointBalance @PersonId;", "DATABASE_CONNECTION_STRING", parameters: "@PersonId={personId}")] IEnumerable<PointBalance> pointBalances)
    {
        return pointBalances;
    }
}