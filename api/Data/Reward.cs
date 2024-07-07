namespace FamilyCommandCenter.Data;

public class Reward
{
    public int RewardId { get; set; }
    public bool Money { get; set; }
    public required string Description { get; set; }
    public int Quantity { get; set; }
    public int Points { get; set; }
    public required string IconPath { get; set; }
}



