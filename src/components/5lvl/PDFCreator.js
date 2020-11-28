import {
  Page,
  Text,
  View,
  Font,
  Image,
  Document,
  StyleSheet
} from '@react-pdf/renderer';
import React from 'react';
import axios from 'axios';

import font from '/work/front/veneziastones/new/venezia_stone/src/fonts/Roboto/Roboto-Regular.ttf';
import font_thin from '/work/front/veneziastones/new/venezia_stone/src/fonts/Roboto/Roboto-Thin.ttf';

const PDFCreator = props => {
  Font.register({ family: 'Roboto', src: font });
  Font.register({ family: 'RobotoThin', src: font_thin });
  return (
    <Document>
      <Page size="A4" style={{ fontFamily: 'RobotoThin', fontSize: 14 }}>
        <View>
          <Image
            style={{ height: '400px', width: '100%' }}
            src={props.imgData}
          />
        </View>
        <Text style={{ margin: '20px 40px', fontSize: 12 }}>
          Тип фото: {props.item.typeFoto}
        </Text>
        <View style={{ margin: '30px auto' }}>
          <Text style={{ fontFamily: 'Roboto', marginBottom: '30px' }}>
            {props.item.itms_name}{' '}
          </Text>
          <Text>Пачка №{props.item.bl} </Text>
          <Text>
            {props.item.itms_izd} №{props.item.ps}
          </Text>
          <Text style={{ marginTop: '20px' }}>
            Страна: {props.item.country}
          </Text>
          <Text style={{ marginTop: '20px' }}>Длина: {props.item.le}"</Text>
          <Text>Ширина: {props.item.he}"</Text>
          <Text style={{ marginTop: '20px' }}>Склад: {props.item.sklad}</Text>
        </View>
      </Page>
    </Document>
  );
};
export default PDFCreator;
