# ParkMobile
**Стек проекта**
- next (15 версия)
- TypeScript
- ESlint
- dotnet (8.0) 
- entityFramework
- Redis


## Docker commands
```bash
docker system df - полная сводка информации(сколько данных содержится по докеру)

docker builder prune - удаление кеша из докера
```
  

## Getting Started
#### Production :
```bash
#в папке park-mobile-ssr
npm  run  build #билдим проект
cd ../ #переходим на путь выше
docker network create app-network #создаем внутреннюю сеть для докер образов
docker compose build --no-cache #билдим проект (без кеша)
docker compose up -d #поднимаем проект
```
#### Development:
```bash
npm run dev #сборка проекта на production
cd ../ #Переходим на уровень выше
dotnet start #Запускаем сервер
```
