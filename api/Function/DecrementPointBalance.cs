using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class DecrementPointBalance
{
    [Function("DecrementPointBalance")]
    public static IEnumerable<PointBalance> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "decrementpointbalance/personId={personId}")] 
        HttpRequestData req,
        [SqlInput("exec dbo.DecrementPointBalance @PersonId;", "DATABASE_CONNECTION_STRING", parameters: "@PersonId={personId}")] IEnumerable<PointBalance> pointBalances)
    {
        return pointBalances;
    }
}