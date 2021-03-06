import computed from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  elementId: 'topic-footer-buttons',

  // Allow us to extend it
  layoutName: 'components/topic-footer-buttons',

  init() {
    this._super();

    this._actions = this._actions || {};

    (this.get('topicDelegated') || []).forEach(m => {
      this._actions[m] = function() {
        this.sendAction(m);
      };
      this.set(m, m);
    });
  },

  @computed('topic.details.can_invite_to')
  canInviteTo(result) {
    return !this.site.mobileView && result;
  },

  inviteDisabled: Ember.computed.or('topic.archived', 'topic.closed', 'topic.deleted'),

  @computed
  showAdminButton() {
    return !this.site.mobileView && this.currentUser.get('canManageTopic');
  },

  @computed('topic.message_archived')
  archiveIcon: archived => archived ? '' : 'folder',

  @computed('topic.message_archived')
  archiveTitle: archived => archived ? 'topic.move_to_inbox.help' : 'topic.archive_message.help',

  @computed('topic.message_archived')
  archiveLabel: archived => archived ? "topic.move_to_inbox.title" : "topic.archive_message.title",

  @computed('topic.bookmarked')
  bookmarkClass: bookmarked => bookmarked ? 'bookmark bookmarked' : 'bookmark',

  @computed('topic.bookmarked')
  bookmarkLabel: bookmarked => bookmarked ? 'bookmarked.clear_bookmarks' : 'bookmarked.title',

  @computed('topic.bookmarked')
  bookmarkTitle: bookmarked => bookmarked ? "bookmarked.help.unbookmark" : "bookmarked.help.bookmark",

});
