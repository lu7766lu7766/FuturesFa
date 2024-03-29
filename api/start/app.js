"use strict";

const path = require("path");
/*
 |--------------------------------------------------------------------------
 | Providers
 |--------------------------------------------------------------------------
 |
 | Providers are building blocks for your Adonis app. Anytime you install
 | a new Adonis specific package, chances are you will register the
 | provider here.
 |
 */
const providers = [
  "@adonisjs/framework/providers/AppProvider",
  "@adonisjs/framework/providers/ViewProvider",
  "@adonisjs/lucid/providers/LucidProvider",
  "@adonisjs/bodyparser/providers/BodyParserProvider",
  "@adonisjs/cors/providers/CorsProvider",
  "@adonisjs/shield/providers/ShieldProvider",
  "@adonisjs/session/providers/SessionProvider",
  "@adonisjs/auth/providers/AuthProvider",
  "@adonisjs/lucid/providers/LucidProvider",
  "@adonisjs/validator/providers/ValidatorProvider",
  "adonis-scheduler/providers/SchedulerProvider",
  "adonis-throttle/providers/ThrottleProvider",
  "@adonisjs/websocket/providers/WsProvider",
  "@adonisjs/redis/providers/RedisProvider",
  path.join(__dirname, "..", "providers", "AppProvider"),
  path.join(__dirname, "..", "providers", "ValidationProvider")
];

/*
 |--------------------------------------------------------------------------
 | Ace Providers
 |--------------------------------------------------------------------------
 |
 | Ace providers are required only when running ace commands. For example
 | Providers for migrations, tests etc.
 |
 */
const aceProviders = [
  "@adonisjs/lucid/providers/MigrationsProvider",
  "adonis-scheduler/providers/CommandsProvider",
  "@adonisjs/vow/providers/VowProvider"
];

/*
 |--------------------------------------------------------------------------
 | Aliases
 |--------------------------------------------------------------------------
 |
 | Aliases are short unique names for IoC container bindings. You are free
 | to create your own aliases.
 |
 | For example:
 |   { Route: 'Adonis/Src/Route' }
 |
 */
const aliases = {
  Scheduler: "Adonis/Addons/Scheduler",
  Throttle: "Adonis/Addons/Throttle"
};

/*
 |--------------------------------------------------------------------------
 | Commands
 |--------------------------------------------------------------------------
 |
 | Here you store ace commands for your package
 |
 */
const commands = [];

module.exports = { providers, aceProviders, aliases, commands };
