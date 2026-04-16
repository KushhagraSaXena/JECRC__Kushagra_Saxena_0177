using System.ComponentModel.DataAnnotations;

namespace ElectronicStoreAPI.Attributes
{
    public class NotEmptyOrWhitespaceAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string str && string.IsNullOrWhiteSpace(str))
            {
                return new ValidationResult($"{validationContext.DisplayName} cannot be empty or whitespace.");
            }

            return ValidationResult.Success;
        }
    }
}