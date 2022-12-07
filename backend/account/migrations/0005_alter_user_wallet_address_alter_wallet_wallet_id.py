# Generated by Django 4.0.8 on 2022-12-07 04:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_alter_user_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='wallet_address',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='account.wallet'),
        ),
        migrations.AlterField(
            model_name='wallet',
            name='wallet_id',
            field=models.CharField(auto_created=True, max_length=40, primary_key=True, serialize=False, unique=True),
        ),
    ]
