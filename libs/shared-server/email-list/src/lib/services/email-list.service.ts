import { Injectable } from '@nestjs/common';
const Mautic = require('mautic');

import { CreateOrUpdateEmailParams } from '../interfaces';
import { SharedServerEmailListConfig } from '../shared-email-list.config';

@Injectable()
export class EmailListService {
  private readonly _mauticConnector = new Mautic({
    baseUrl: this._config.mauticApiUrl,
    auth: {
      username: this._config.mauticUsername,
      password: this._config.mauticPassword,
    },
  });

  constructor(private readonly _config: SharedServerEmailListConfig) {}

  public async removeTags(email: string, tags: string[]) {
    const response = await this._mauticConnector.contacts.list({
      search: email,
    });

    if (response.status === 200 && response.data) {
      const contact = Object.values(response.data.contacts)[0] as any;

      const filteredTags = contact.tags
        .map((t) => t.tag)
        .map((v) => (tags.includes(v) ? `-${v}` : v));

      await this._mauticConnector.contacts.edit(contact.id, {
        tags: [...filteredTags],
      });
    }
  }

  public async addTags(email: string, tags: string[]) {
    const response = await this._mauticConnector.contacts.list({
      search: email,
    });

    if (response.status === 200 && response.data) {
      const contact = Object.values(response.data.contacts)[0] as any;

      const currentTags = contact.tags.map((t) => t.tag);

      await this._mauticConnector.contacts.edit(contact.id, {
        tags: [...currentTags, ...tags],
      });
    }
  }

  public async createOrUpdateEmail(
    params: CreateOrUpdateEmailParams
  ): Promise<void> {
    await this._mauticConnector.contacts.create({
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      owner: 1,
      tags: params.tags,
    });
  }
}
