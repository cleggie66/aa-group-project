from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text
from .users import demo, alec, brad, spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray

def seed_channels():
    general = Channel(
        name='general', workspace_id=1, is_channel=True, users_in_channels=[demo, alec, brad])
    november = Channel(
        name='2022-11-21-online', workspace_id=1, is_channel=True, users_in_channels=[demo, alec, brad])
    lecture = Channel(
        name='2022-11-21-lecture-questions', workspace_id=1, is_channel=True, users_in_channels=[demo, alec, brad])
    project = Channel(
        name='lecture questions', workspace_id=1, is_channel=True, users_in_channels=[demo, alec, brad])
    dm = Channel(
        name='Brad Instructor', workspace_id=1, is_channel=False, users_in_channels=[demo, brad])
    krusty_krab = Channel(
        name='Krusty Krab', workspace_id=4, is_channel=True, users_in_channels=[demo,spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray])
    town_meeting = Channel(
        name='Town Meeting', workspace_id=4, is_channel=True, users_in_channels=[demo,spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray])
    salty_spitoon = Channel(
        name='Salty Spitoon', workspace_id=4, is_channel=True, users_in_channels=[demo,spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray])
    home_sick = Channel(
        name='Home Sick', workspace_id=4, is_channel=True, users_in_channels=[demo,spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray])
    painting = Channel(
        name='The Painting', workspace_id=4, is_channel=True, users_in_channels=[demo,spongebob, patrick, mr_krabs, sandy, squidward, larry, bubble_bass, man_ray])
    wallet = Channel(
        name='Man Ray', workspace_id=4, is_channel=False, users_in_channels=[demo, man_ray])
    krabby_patty = Channel(
        name='Squidward Tentacles', workspace_id=4, is_channel=False, users_in_channels=[demo, squidward])
    stupid_somewhere = Channel(
        name='Sandy Cheeks', workspace_id=4, is_channel=False, users_in_channels=[demo, sandy])
    patrick_dm = Channel(
        name='Patrick Star', workspace_id=4, is_channel=False, users_in_channels=[demo, patrick])






    db.session.add(general)
    db.session.add(november)
    db.session.add(lecture)
    db.session.add(project)
    db.session.add(dm)
    db.session.add(krusty_krab)
    db.session.add(town_meeting)
    db.session.add(salty_spitoon)
    db.session.add(home_sick)
    db.session.add(painting)
    db.session.add(wallet)
    db.session.add(krabby_patty)
    db.session.add(stupid_somewhere)
    db.session.add(patrick_dm)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_members RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM channel_members"))
        db.session.execute(text("DELETE FROM channels"))


    db.session.commit()
