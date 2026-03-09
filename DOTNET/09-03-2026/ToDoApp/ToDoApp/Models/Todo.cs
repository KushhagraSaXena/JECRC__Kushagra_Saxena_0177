namespace TodoApi.Models
{
    public class Todo
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; }

        public int Priority { get; set; }   // 1 = Low, 2 = Medium, 3 = High
    }
}