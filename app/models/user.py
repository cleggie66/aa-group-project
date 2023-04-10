from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .channel_member import channel_members
from .workspace_member import workspace_members
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(55), nullable=False)
    last_name = db.Column(db.String(55), nullable=False)
    profile_picture = db.Column(db.String(55), nullable=False)
    title = db.Column(db.String(55), nullable=False)
    about_me = db.Column(db.Text)

    # * Relationships 💚
    # One to Many
    owned_workspaces = db.relationship("Workspace", back_populates="workspace_owner", cascade='all, delete')
    user_messages = db.relationship("Message", back_populates="message_owner", cascade='all, delete')
    # Many to Many 
    joined_channels = db.relationship("Channel", secondary=channel_members, back_populates= 'users_in_channels')
    joined_workspaces = db.relationship("Workspace", secondary=workspace_members, back_populates= 'users_in_workspaces', cascade="all, delete")

    
  
    


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_picture': self.profile_picture,
            'title': self.title,
            'about_me': self.about_me
        }
