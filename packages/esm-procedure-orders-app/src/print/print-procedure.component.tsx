import React from 'react';
import styles from './print-procedure.scss';
import { useConfig, useSession, formatDate } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import startCase from 'lodash-es/startCase';
import dayjs from 'dayjs';
import { Order, Result } from '../types';

interface PrintableReportProps {
  completedOrder: Result;
  ordererName: string;
}

const PrintableReport: React.FC<PrintableReportProps> = ({ completedOrder, ordererName }) => {
  const { t } = useTranslation();
  const { logo } = useConfig({ externalModuleName: '@ugandaemr/esm-login-app' });
  const { sessionLocation, user } = useSession();
  const location = sessionLocation?.display;

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.printableHeader}>
          <p className={styles.heading}>
            {t('procedureReport', 'Procedure Report')} - {completedOrder?.orderNumber}
          </p>
          {logo?.src && <img className={styles.img} height={50} width={150} src={logo.src} alt={logo.alt} />}
        </div>
        <div className={styles.printableBody}>
          <div className={styles.billDetails}>
            <p className={styles.itemHeading}>{t('reportSummaryTo', 'Report summary to')}</p>
            <p className={styles.itemLabel}>
              {t('name', 'Name')}: {startCase(completedOrder?.patient?.person?.display)}
            </p>
            <p className={styles.itemLabel}>
              {t('identifier', 'Identifier')}: {completedOrder?.patient?.identifiers[0]?.identifier}
            </p>
            <p className={styles.itemLabel}>
              {t('age', 'Age')}: {completedOrder?.patient?.person?.age}
            </p>
            <p className={styles.itemLabel}>
              {t('gender', 'Gender')}:
              {completedOrder?.patient?.person?.gender === 'M'
                ? ' Male'
                : completedOrder?.patient?.person?.gender === 'F'
                ? ' Female'
                : ' Unknown'}
            </p>
            <p className={styles.itemLabel}>
              {t('date', 'Date')}:{' '}
              {completedOrder?.dateActivated ? dayjs(completedOrder.dateActivated).format('DD-MMM-YYYY') : '--'}
            </p>
            <p className={styles.itemLabel}>
              {t('orderer', 'Orderer')}: {ordererName}
            </p>
          </div>

          <div className={styles.facilityDetails}>
            <p className={styles.facilityName}>{location}</p>
            <p className={styles.facilityName}>{completedOrder?.careSetting?.name}</p>
            <p className={styles.facilityName}>{t('uganda', 'Uganda')}</p>
          </div>
        </div>
        <div className={styles.printResults}>
          <p className={styles.itemHeading}>{t('procedure', 'Procedure')}</p>
          <div className={styles.reportSection}>
            <p className={styles.itemLabel}>{startCase(completedOrder?.concept?.display)}</p>
          </div>
        </div>
        <div className={styles.printResults}>
          <p className={styles.itemHeading}>{t('complications', 'Complications')}</p>
          <div className={styles.reportSection}>
            <p className={styles.itemLabel}>{completedOrder?.procedures[0]?.encounters[0]?.obs[0]?.display}</p>
          </div>
        </div>
        <div className={styles.printResults}>
          <p className={styles.itemHeading}>{t('findings', 'Findings')}</p>
          <div className={styles.reportSection}>
            <p className={styles.itemLabel}>{completedOrder?.procedures[0]?.procedureReport}</p>
          </div>
        </div>
      </div>

      <section className={styles.sectionFooter}>
        <div
          style={{
            margin: '10px',
            display: 'flex',
            width: '500px',
            flexDirection: 'row',
          }}>
          <span style={{ fontSize: '14px', marginBottom: '10px' }}>
            Results Reviewed / Authorized by :<span style={{ marginLeft: '50px' }}>{user?.display}</span>
          </span>
        </div>
        <div
          style={{
            margin: '10px',
            display: 'flex',
            width: '500px',
            flexDirection: 'row',
          }}>
          <span style={{ fontSize: '14px', marginTop: '10px' }}>
            Sign : ............................................{' '}
          </span>
        </div>
      </section>
    </div>
  );
};

export default PrintableReport;
