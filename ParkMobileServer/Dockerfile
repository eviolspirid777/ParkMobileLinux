# Используем официальный образ ASP.NET Core runtime для запуска приложения
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 3001

# Используем официальный образ .NET SDK для сборки приложения
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy only the project file and restore dependencies
COPY ["ParkMobileServer.csproj", "./"]
RUN dotnet restore "./ParkMobileServer.csproj"

# Copy the remaining files and build the application
COPY . .
RUN dotnet publish "./ParkMobileServer.csproj" -c Release -o /app/publish

# Копируем опубликованное приложение в runtime-образ
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ParkMobileServer.dll"]