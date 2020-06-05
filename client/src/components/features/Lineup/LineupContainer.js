import { connect } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { loadSeatsRequest, getSeats } from '../../../redux/seatsRedux';
import Lineup from './Lineup';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
  request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcerts: () => dispatch(loadConcertsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lineup);