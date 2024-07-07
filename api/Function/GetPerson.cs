using FamilyCommandCenter.Data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Azure.Functions.Worker.Http;

namespace FamilyCommandCenter.Function;

public static class GetPerson
{
    [Function("GetPerson")]
    public static IEnumerable<Person> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "getperson/personId={id}")] 
        HttpRequestData req,
        [SqlInput("select * from Person where PersonId = @Id", "SqlConnectionString", parameters: "@Id={id}")] IEnumerable<Person> persons)
    {
        return persons;
    }
}