const { User, UserSchema } = require('./user.model')
const { Project, ProjectSchema } = require('./project.model')
const { Skill, SkillSchema } = require('./skill.model')
const { ScienceBranch, ScienceBranchSchema } = require('./scienceBranch.model')
const { Room, RoomSchema } = require('./room.model')
const { Message, MessageSchema } = require('./message.model')
const { Invitation, InvitationSchema } = require('./invitation.model')

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Project.init(ProjectSchema, Project.config(sequelize))
  Skill.init(SkillSchema, Skill.config(sequelize))
  ScienceBranch.init(ScienceBranchSchema, ScienceBranch.config(sequelize))
  Room.init(RoomSchema, Room.config(sequelize))
  Message.init(MessageSchema, Message.config(sequelize))
  Invitation.init(InvitationSchema, Invitation.config(sequelize))
}

module.exports = setupModels
