using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetMoneyBalance
{
    [Function("GetMoneyBalance")]
    public static IEnumerable<MoneyBalance> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "getmoneybalance/personId={personId}")] 
        HttpRequestData req,
        [SqlInput("select * from MoneyBank where PersonId = @PersonId", "DATABASE_CONNECTION_STRING", parameters: "@PersonId={personId}")] IEnumerable<MoneyBalance> moneyBalances)
    {
        return moneyBalances;
    }
}