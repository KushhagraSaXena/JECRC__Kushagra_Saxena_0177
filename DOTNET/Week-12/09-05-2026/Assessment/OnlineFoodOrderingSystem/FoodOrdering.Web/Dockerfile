# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["FoodOrdering.Web/FoodOrdering.Web.csproj", "FoodOrdering.Web/"]
COPY ["FoodOrdering.Infrastructure/FoodOrdering.Infrastructure.csproj", "FoodOrdering.Infrastructure/"]
COPY ["FoodOrdering.Domain/FoodOrdering.Domain.csproj", "FoodOrdering.Domain/"]
RUN dotnet restore "FoodOrdering.Web/FoodOrdering.Web.csproj"
COPY . .
WORKDIR "/src/FoodOrdering.Web"
RUN dotnet publish "FoodOrdering.Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "FoodOrdering.Web.dll"]
vvv
VOLUME