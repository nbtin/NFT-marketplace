# Generated by Django 4.0.6 on 2022-12-31 14:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NFT',
            fields=[
                ('token_id', models.AutoField(primary_key=True, serialize=False)),
                ('creator_fee', models.FloatField(default=0.01)),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
                ('price', models.FloatField(default=0)),
                ('image', models.ImageField(default='NFTs/default.jpg', upload_to='NFTs/')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('history', models.CharField(default='', max_length=1000)),
                ('chain', models.CharField(default='Ethereum', max_length=100)),
                ('last_sale', models.DateTimeField(blank=True, null=True)),
                ('for_sale', models.BooleanField(default=False)),
                ('creator_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creator_id', to='account.user')),
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner_id', to='account.user')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.IntegerField(default=0)),
                ('time_stamp', models.DateTimeField(auto_now_add=True)),
                ('price', models.FloatField(default=0)),
                ('transaction_fee', models.IntegerField()),
                ('gas_price', models.FloatField()),
                ('buyer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buyer_id', to='account.user')),
                ('seller_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seller_id', to='account.user')),
                ('token_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='market.nft')),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nft_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nft_id_f', to='market.nft')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id_f', to='account.user')),
            ],
        ),
        migrations.AddConstraint(
            model_name='follow',
            constraint=models.UniqueConstraint(fields=('user_id', 'nft_id'), name='unique_follow'),
        ),
    ]
