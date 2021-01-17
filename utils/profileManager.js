//Responsible for generating a new hustle castle bot config file
//edit the config files, and update them.  All with inquirer

let BOT_SETTINGS = {
  alarm_suspicious_activity: 1,
  emulator_in_background: 1,
  max_screen_sleep_time: 100,
  other_device_sleep_time: 120,
  auto_start: 1,
};

let GENERAL = {
  low_health_sleep_time: 30,
};

let INVASIONS = {
  invasions: 1,
  invasions_low_health_battle: 1,
  invasions_hero_relic: 1,
};

//TR 8+
let GEM_BAY = {
  gem_bay: 0,
  gem_bay_use_food: 1,
  deploy_previous_squad: 0,
  gem_bay_collect_reward: 1,
  gem_bay_hero_relic: 1,
};

//TR 4+?
let PVP = {
  repeat_pvp: 0,
  pvp_max_squad_power_scale: 90,
  pvp_low_health_battle: 1,
  pvp_hero_relic: 0,
  change_opponent: 1,
  reattack_defeated: 1,
  pvp_min_gold: 10000,
  pvp_min_mana: 0,
  pvp_min_wood: 0,
  pvp_min_iron: 0,
  pvp_min_mithril: 0,
};

//TR 6+
let PORTAL = {
  repeat_portal: 0,
  max_portal_level: 24,
  force_max_level: 1,
  portal_low_health_battle: 0,
  portal_hero_relic: 0,
};

//TR 5+
let TOURNAMENT = {
  repeat_ticket: 0,
  repeat_food: 0,
  use_ticket_first: 1,
  tournament_strategy: 4,
  max_squad_power_scale: 90,
  tournament_collect_reward: 1,
  max_new_tournament_sleep_time: 30,
};

let ISLAND_EVENT = {
  island_event: 0,
  island_diamond_reset: 1,
  island_low_health_battle: 0,
  island_hero_relic: 1,
};
