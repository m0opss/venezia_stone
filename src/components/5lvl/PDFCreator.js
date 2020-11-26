import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet
} from '@react-pdf/renderer';
import React from 'react';
import axios from 'axios';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 45,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Roboto'
  },
  subtitle: {
    fontSize: 16,
    margin: 12,
    fontFamily: 'Roboto'
  },
  text: {
    margin: 12,
    fontSize: 12,
    fontFamily: 'Roboto',
    textAlign: 'justify'
  },
  image: {
    height: 150,
    marginBottom: 30,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 25,
    left: 35,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Roboto'
  }
});

const PDFCreator = props => {
  console.log(props.item);
  const [imgData, setImgData] = React.useState('');
  React.useEffect(() => {
    // axios
    //   .post(`https://catalog-veneziastone.ru/api_v0/get_photo_bytes/`, {
    //     ps: props.item.ps
    //   })
    //   .then(response => {
    //     setImgData(response.data.bytes);
    //   })
    //   .catch(err => {
    //     if (err.response) {
    //       // client received an error response (5xx, 4xx)
    //       console.log(1, err.response);
    //       // props.setAuth(false);
    //     } else if (err.request) {
    //       // client never received a response, or request never left
    //       console.log(2, err.request);
    //     } else {
    //       // anything else
    //       console.log(3, err);
    //     }
    //   });
  });
  // console.log(imgData)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* <Image src={imgData} /> */}
          <Image
            source={() => {
              axios
                .post(
                  `https://catalog-veneziastone.ru/api_v0/get_photo_bytes/`,
                  {
                    ps: props.item.ps
                  }
                )
                .then(response => {
                  console.log(111111, {
                    data: 'data:image/jpg;base64,' + response.data.bytes,
                    format: 'jpg'
                  });
                  return {
                    data: 'data:image/jpg;base64,' + response.data.bytes,
                    format: 'jpg'
                  };
                })
                .catch(err => {
                  if (err.response) {
                    // client received an error response (5xx, 4xx)
                    console.log(1, err.response);
                    // props.setAuth(false);
                  } else if (err.request) {
                    // client never received a response, or request never left
                    console.log(2, err.request);
                  } else {
                    // anything else
                    console.log(3, err);
                  }
                });
            }}
          />
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};
export default PDFCreator;
