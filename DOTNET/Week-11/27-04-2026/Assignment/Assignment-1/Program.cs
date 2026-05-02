// 1. Sum of Digits
// Problem:
// Write a function to calculate the sum of digits of a given number.

// Input:
// An integer n.

// Output:
// The sum of digits of n.

using System;
/*

  class Program
{
  public static void Main(string[] args)
  {
    Console.WriteLine("Enter a number:");
    int n = Convert.ToInt32(Console.ReadLine());
    int sum = SumOfDigits(n);
    Console.WriteLine($"The sum of digits of {n} is: {sum}");
  }

  public static int SumOfDigits(int n)
  {
    int sum = 0;
    while (n != 0)
    {
      sum += n % 10;
      n /= 10;
    }
    return sum;
  }
}
*/

//------------------------------------------------------------------------------

// 2. Palindrome
// Problem:
// Check if a given string is a palindrome.

// Input:
// A string s.
// Output:
// True if s is a palindrome, False otherwise.

/*
class Solution
{
    static bool IsPalindrome(string s)
    {
        int left = 0, right = s.Length - 1;
        
        while (left < right)
        {
            if (s[left] != s[right])
                return false;
            left++;
            right--;
        }
        
        return true;
    }
    static void Main(string[] args)
    {
        string s = Console.ReadLine();
        Console.WriteLine(IsPalindrome(s) ? "True" : "False");
    }
}
*/

//------------------------------------------------------------------------------
// 3. FizzBuzz
// Problem:
// Write a function that prints the numbers from 1 to n. But for multiples of three, print "Fizz" instead of the number, and for the multiples of five, print "Buzz". For numbers which are multiples of both three and five, print "FizzBuzz".

// Input:
// An integer n.
// Output:
// Print the numbers from 1 to n with the specified replacements.

/*
class Solution
{
    static void FizzBuzz(int n)
    {
        for (int i = 1; i <= n; i++)
        {
            if (i % 3 == 0 && i % 5 == 0)
                Console.WriteLine("FizzBuzz");
            else if (i % 3 == 0)
                Console.WriteLine("Fizz");
            else if (i % 5 == 0)
                Console.WriteLine("Buzz");
            else
                Console.WriteLine(i);
        }
    }
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        FizzBuzz(n);
    }
}
*/
//------------------------------------------------------------------------------
// 4. Two Sum
// Problem:
// Given an array of integers nums and a target integer target, return the indices of the two numbers such that they add up to target.

/*
using System;
using System.Collections.Generic;
class Solution
{
    static int[] TwoSum(int[] nums, int target)
    {
        Dictionary<int, int> map = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            int complement = target - nums[i];
            if (map.ContainsKey(complement))
                return new int[] { map[complement], i };
            map[nums[i]] = i;
        }
        return new int[] { -1, -1 };  // This shouldn't happen if a solution exists
    }
    static void Main(string[] args)
    {
        int target = int.Parse(Console.ReadLine());
        int[] nums = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        
        int[] result = TwoSum(nums, target);
        Console.WriteLine($"[{result[0]}, {result[1]}]");
    }
}
*/


//5. Find the Missing Number
// Problem:
// Given an array of n-1 numbers in the range from 1 to n, find the missing number.

/*
class Solution
{
    static int FindMissingNumber(int[] arr)
    {
        int n = arr.Length + 1;
        int totalSum = n * (n + 1) / 2;
        int arrSum = 0;
        
        foreach (int num in arr)
            arrSum += num;
        return totalSum - arrSum;
    }
    static void Main(string[] args)
    {
        int[] arr = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        Console.WriteLine(FindMissingNumber(arr));
    }
}
*/

// 6. Merge Sorted Arrays
// Problem:
// Given two sorted arrays, merge them into a single sorted array.

/*
class Solution
{
    static int[] MergeSortedArrays(int[] arr1, int[] arr2)
    {
        int[] result = new int[arr1.Length + arr2.Length];
        int i = 0, j = 0, k = 0;
        while (i < arr1.Length && j < arr2.Length)
        {
            if (arr1[i] < arr2[j])
                result[k++] = arr1[i++];
            else
                result[k++] = arr2[j++];
        }
        while (i < arr1.Length)
            result[k++] = arr1[i++];
        while (j < arr2.Length)
            result[k++] = arr2[j++];
        return result;
    }
    static void Main(string[] args)
    {
        int[] arr1 = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        int[] arr2 = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        int[] mergedArray = MergeSortedArrays(arr1, arr2);
        Console.WriteLine(string.Join(" ", mergedArray));
    }
}
*/
//------------------------------------------------------------------------------