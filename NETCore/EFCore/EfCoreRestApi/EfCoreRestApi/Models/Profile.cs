namespace EfCoreRestApi.Models;

public class Profile
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
}