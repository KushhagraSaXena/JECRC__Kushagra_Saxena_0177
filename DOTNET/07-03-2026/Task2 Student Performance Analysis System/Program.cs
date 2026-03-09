using System;
using System.Collections.Generic;
using System.Linq;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
}

public class AnalysisEngine
{
    public void DisplayPassedStudents(List<Student> students)
    {
        Console.WriteLine("Passed Students:");
        
        students.Where(s => s.Marks >= 50)
                .Select(s => s.Name)
                .ToList()
                .ForEach(Console.WriteLine);
                
        Console.WriteLine(); 
    }

    public void DisplayTopper(List<Student> students)
    {
        Console.WriteLine("Topper:");
        
        var topper = students.OrderByDescending(s => s.Marks).First();
        
        Console.WriteLine($"{topper.Name} - {topper.Marks}");
        Console.WriteLine();
    }

    public void DisplaySortedStudents(List<Student> students)
    {
        Console.WriteLine("Students Sorted by Marks:");
        
        students.OrderByDescending(s => s.Marks)
                .Select(s => $"{s.Name} - {s.Marks}")
                .ToList()
                .ForEach(Console.WriteLine);
    }
}

public class Solution
{
    public static void Main()
    {        List<Student> students = new List<Student>
        {
            new Student { StudentId = 101, Name = "Ananya", Marks = 78 },
            new Student { StudentId = 102, Name = "Ravi", Marks = 45 },
            new Student { StudentId = 103, Name = "Neha", Marks = 88 },
            new Student { StudentId = 104, Name = "Arjun", Marks = 67 }
        };

        AnalysisEngine engine = new AnalysisEngine();

        engine.DisplayPassedStudents(students);
        engine.DisplayTopper(students);
        engine.DisplaySortedStudents(students);
        Console.WriteLine();
    }
}