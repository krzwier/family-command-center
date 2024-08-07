using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetAllPersons
{
    [Function("GetAllPersons")]
    public static IEnumerable<Person> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "getallpersons")] HttpRequestData req,
        [SqlInput("select * from Person", "DATABASE_CONNECTION_STRING")] IEnumerable<Person> persons)
    {
        return persons;
    }
}