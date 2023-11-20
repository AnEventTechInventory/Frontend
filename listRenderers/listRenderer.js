import {Component} from "react";
import {ActivityIndicator, FlatList, View} from "react-native";

class listRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            error: false,
            errorMessage: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await axios.get(
                'https://api.themoviedb.org/3/movie/popular?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&page=1',
            );
            this.setState({list: response.data.results, loading: false});
        } catch (error) {
            this.setState({
                error: true,
                errorMessage: error.message,
                loading: false,
            });
        }
    };

    render() {
        const {list, loading, error, errorMessage} = this.state;
        return (
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : error ? (
                    <Text>{errorMessage}</Text>
                ) : (
                    <FlatList
                        data={list}
                        renderItem={({item}) => (
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.overview}>{item.overview}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </View>
        );
    }

    static styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                paddingTop: 22
            },
            item: {
                padding: 10,
                fontSize: 18,
                height: 44,
            },
            overview: {
                padding: 10,
                fontSize: 18,
                height: 44,
            },
        }
  )
}
