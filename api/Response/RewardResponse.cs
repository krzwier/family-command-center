using FamilyCommandCenter.Data;

namespace FamilyCommandCenter.Response;

public class RewardResponse
{
    public int PointBalance { get; set; }
    public required IEnumerable<Reward> AvailableRewards {get; set;}
    public required IEnumerable<PersonReward> ClaimedRewards {get; set;}
}