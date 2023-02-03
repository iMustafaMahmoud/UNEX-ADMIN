import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
// import { fCurrency } from '../../../../utils/formatNumber';
// import { fDate } from '../../../../utils/formatTime';
// @types
//
import styles from './InvoiceStyle';
import namedColors from 'color-name-list';

// ----------------------------------------------------------------------

type Props = {
  invoice: any;
};

export default function InvoicePDF({ invoice }: Props) {
  const getColorName = (itemColor: string) => {
    let someColor = namedColors.find((color) => color.hex === itemColor);
    return someColor ? someColor?.name : itemColor;
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/unexLogo.png" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text>
              {' '}
              {`INV-${
                String(invoice?.id).split('-')?.[String(invoice?.id).split('-').length - 1]
              }`}{' '}
            </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Client Name</Text>
            <Text style={(styles.body1, styles.mb8)}>{invoice?.userName}</Text>
            <Text style={[styles.overline, styles.mb8]}>Mobile Number</Text>
            <Text style={styles.body1}>{invoice?.phoneNumber}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Date create</Text>
            <Text style={(styles.body1, styles.mb8)}>
              {invoice?.createdDate?.toString()?.split('T'[0])}
            </Text>
            <Text style={[styles.overline, styles.mb8]}>Address</Text>

            <Text style={styles.body1}>{invoice?.address}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Order Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={(styles.subtitle2, styles.alignLeft)}>product</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={(styles.subtitle2, styles.alignLeft)}>Quantity</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={(styles.subtitle2, styles.alignLeft)}>size</Text>
              </View>

              <View style={[styles.tableCell_4]}>
                <Text style={(styles.subtitle2, styles.alignLeft)}>color</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {invoice?.products?.map((item: any, index: any) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell_1}>
                  <Text style={styles.subtitle2}>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={(styles.subtitle2, styles.alignLeft)}>{item?.enname}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text style={(styles.subtitle2, styles.alignLeft)}>{item?.count}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text style={(styles.subtitle2, styles.alignLeft)}>{item?.size}</Text>
                </View>

                <View style={styles.tableCell_4}>
                  <Text style={styles.subtitle2}>{getColorName(item?.color as string)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{invoice?.totalAmount}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Taxes</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{0}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{invoice?.totalAmount}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>
              We appreciate your business. Should you need us to add VAT or extra notes let us know!
            </Text>
          </View>
          <View style={[styles.col4]}>
            <Text style={styles.subtitle2}>Have a Question? Contact Us on </Text>
            <Text>unex.city.active@gmail.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
