# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["FoodOrdering.API/FoodOrdering.API.csproj", "FoodOrdering.API/"]
COPY ["FoodOrdering.Infrastructure/FoodOrdering.Infrastructure.csproj", "FoodOrdering.Infrastructure/"]
COPY ["FoodOrdering.Domain/FoodOrdering.Domain.csproj", "FoodOrdering.Domain/"]
RUN dotnet restore "FoodOrdering.API/FoodOrdering.API.csproj"
COPY . .
WORKDIR "/src/FoodOrdering.API"
RUN dotnet publish "FoodOrdering.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "FoodOrdering.API.dll"]
