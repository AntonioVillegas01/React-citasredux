import React, {Component} from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types'


import {connect} from 'react-redux'
import {agregarCita} from "../actions/citasActions";
import {mostrarError} from "../actions/errorActions";

class AgregarCita extends Component {

    componentWillMount() {
        this.props.mostrarError(false)
    }

    //refs
    nombreMascotaRef = React.createRef()
    propietarioMascotaRef = React.createRef()
    fechaRef = React.createRef()
    horaRef = React.createRef()
    sintomasRef = React.createRef()



    crearNuevaCita = e => {
        e.preventDefault()

        //se asignan los valores del formulario a las constantes
        const mascota = this.nombreMascotaRef.current.value,
            propietario = this.propietarioMascotaRef.current.value,
            fecha = this.fechaRef.current.value,
            hora = this.horaRef.current.value,
            sintoma = this.sintomasRef.current.value

        //Validamos que los campos sean requeridos, los pipes significan "o"
        if(mascota === '' || propietario === '' || fecha === '' || hora === '' || sintoma === '' ){
            this.props.mostrarError(true)
        }else{

            //creamos el objeto con los valores de las constantes
            const nuevaCita = {
                id: uuid(),
                mascota : mascota,
                propietario,
                fecha,
                hora,
                sintoma
            }


            //se envia el objeto al padre
            this.props.agregarCita(nuevaCita)

            //reiniciar el formulario
            e.currentTarget.reset()

            //elimina el error
            this.props.mostrarError(false)
        }
    }

    render() {
        const existeError = this.props.error;
        return (
            <div className="card mt-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Agrega las Citas Aqui
                    </h2>
                    <form onSubmit={this.crearNuevaCita}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                            <div className="col-sm-8 col-lg-10">
                                <input ref={this.nombreMascotaRef} type="text" className="form-control" placeholder="Nombre Mascota"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Dueño</label>
                            <div className="col-sm-8 col-lg-10">
                                <input  ref={this.propietarioMascotaRef} type="text" className="form-control" placeholder="Nombre Dueño de la Mascota"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">
                                <input ref={this.fechaRef}  type="date" className="form-control"/>
                            </div>

                            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className="col-sm-8 col-lg-4">
                                <input  ref={this.horaRef} type="time" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea  ref={this.sintomasRef} className="form-control"   > </textarea>
                            </div>
                        </div>
                        <div className="form-group row justify-content-end">
                            <div className="col-sm-3">
                                <button type="submit" className="btn btn-success w-100">Agregar</button>
                            </div>
                        </div>
                    </form>
                    {existeError ? <div className="alert alert-danger text-center">Todos los campos son obligatorios</div> : ''}
                </div>
            </div>
        );
    }
}



AgregarCita.propTypes = {
    agregarCita : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    citas : state.citas.citas,
    error : state.error.error
})

export default connect(mapStateToProps, {agregarCita, mostrarError}) (AgregarCita) ;