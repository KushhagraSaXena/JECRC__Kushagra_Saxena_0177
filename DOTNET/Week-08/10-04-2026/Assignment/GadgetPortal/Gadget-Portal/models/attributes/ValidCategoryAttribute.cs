using System.ComponentModel.DataAnnotations;

namespace ElectronicStoreAPI.Attributes
{
    public class ValidCategoryAttribute : ValidationAttribute
    {
        private readonly string[] validCategories =
        {
            "Smart Eyewear",
            "Wearables",
            "Accessories",
            "VR",
            "AR",
            "Smart Devices"
        };

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            if (!validCategories.Contains(value.ToString()))
            {
                return new ValidationResult(
                    $"Invalid category. Allowed values: {string.Join(", ", validCategories)}"
                );
            }

            return ValidationResult.Success;
        }
    }
}