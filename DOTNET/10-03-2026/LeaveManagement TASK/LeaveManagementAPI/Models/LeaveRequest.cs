using System.Text.Json.Serialization;

public class LeaveRequest
{
    public int Id { get; set; }

    [JsonIgnore]
    public int EmployeeId { get; set; }

    public string LeaveType { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string Reason { get; set; }

    [JsonIgnore]
    public string Status { get; set; } = "Pending";
}