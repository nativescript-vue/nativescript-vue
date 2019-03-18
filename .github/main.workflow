workflow "Run issue bot" {
  on = "issues"
  resolves = ["nativescript-vue/issue-bot-action"]
}

action "nativescript-vue/issue-bot-action" {
  uses = "nativescript-vue/issue-bot-action@master"
  secrets = ["BOT_TOKEN", "GH_TOKEN"]
}
