// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { inject, observer } from 'mobx-react';
import Base from 'containers/TabDetail';
import BaseDetail from './BaseDetail';
import { DNSRecordSetsStore } from 'src/stores/designate/recordSets';
import { DNS_RECORD_TYPE } from 'src/utils/dns-rrtype';

export class RecordSetsDetail extends Base {
  init() {
    this.store = new DNSRecordSetsStore();
  }

  get titleValue() {
    return this.detailData.id;
  }

  get name() {
    return t('Recordset Detail');
  }

  get listUrl() {
    return this.getRoutePath('dnsZonesDetail', { id: this.detailData.zone_id }, { 'tab': 'record_sets' });
  }

  get policy() {
    return 'get_images';
  }

  get detailInfos() {
    return [
      {
        title: t('Name'),
        dataIndex: 'name',
      },
      {
        title: t('Description'),
        dataIndex: 'description',
      },
      {
        title: t('Type'),
        dataIndex: 'type',
        render: (data) => data + (Object.keys(DNS_RECORD_TYPE).includes(data) ? " - " + DNS_RECORD_TYPE[data].name : "")
      },
      {
        title: t('Status'),
        dataIndex: 'status',
      }
    ];
  }

  get tabs() {
    const tabs = [
      {
        title: t('Overview'),
        key: 'overview',
        component: BaseDetail,
      }
    ]

    return tabs;
  }

}

export default inject('rootStore')(observer(RecordSetsDetail));