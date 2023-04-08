from .db import db, environment, SCHEMA, add_prefix_for_prod
from .workspace_member import workspace_members


class Workspace(db.Model):
    __tablename__ = 'workspaces'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(50), nullable=False)
    icon = db.Column(db.String(250))

    # * Relationships 💚
    # One to Many
    workspace_owner = db.relationship("User", back_populates="owned_workspaces")
    # Many to Many
    users_in_workspaces = db.relationship("User", secondary=workspace_members, back_populates= 'joined_workspaces')
