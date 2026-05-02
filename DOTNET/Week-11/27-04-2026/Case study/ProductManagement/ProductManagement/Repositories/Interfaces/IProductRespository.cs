using ProductManagement.Repositories.Implementations;
using ProductManagement.DTOs;

namespace ProductManagement.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductResponseDto>> GetAllAsync();
        Task<ProductResponseDto> GetByIdAsync(int id);
        Task<int> CreateAsync(ProductResponseDto dto);
        Task<bool> UpdateAsync(int id,ProductResponseDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
