workflow "Run issue bot" {
  resolves = ["rigor789/nativescript-vue-issue-bot@actions"]
  on = "issues"
}

action "rigor789/nativescript-vue-issue-bot@actions" {
  uses = "rigor789/nativescript-vue-issue-bot@actions"
}
