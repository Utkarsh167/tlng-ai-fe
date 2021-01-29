import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective implements OnInit, OnDestroy {
  @Output() selectAddress: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;
  js: any;
  gmapjs: any;

  constructor(elRef: ElementRef) {
    this.addGApiJs();
    // elRef will get a reference to the element where
    // the directive is placed
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    // @params: place - Google Autocomplete place object
    // @returns: location_obj - An address object in human readable format
    const location_obj = {};

    for (const i of Object.keys(place.address_components)) {
      const item = place.address_components[i];

      location_obj['formatted_address'] = place.formatted_address;
      location_obj['latitude'] = place.geometry.location.lat();
      location_obj['longitude'] = place.geometry.location.lng();
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['long_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['short_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['short_name'];
      }
      else if (item['types'].indexOf('sublocality_level_1') > -1) {
        location_obj['sublocality_level_1'] = item['long_name'];
      }
    }

    return location_obj;
  }

  ngOnInit() {
    setTimeout(() => {
      const google = window['google'];

      // const autocomplete = new google.maps.places.Autocomplete(this.element, {
      //   types: ['address'] // 'establishment' / 'address' / 'geocode'
      // });

      const autocomplete = new google.maps.places.Autocomplete(this.element)
      // Event listener to monitor place changes in the input
      autocomplete.addListener('place_changed', () => {
        // Emit the new address object for the updated place
        const place: any = autocomplete.getPlace();

        this.selectAddress.emit(
          this.getFormattedAddress(autocomplete.getPlace())
        );
      });
    }, 1000);
  }

  addGApiJs() {
    const self = this;
    (function (d, s, id) {
      self.js = d.getElementsByTagName(s)[0];
      self.gmapjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      self.js = d.createElement(s);
      self.js.id = id;
      self.js.src =
        'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAXFhXOPayCOxqrDeaR5_vD1vpXX0QUbM4';
      self.gmapjs.parentNode.insertBefore(self.js, self.gmapjs);
    })(document, 'script', 'google-map-api');
  }

  removeGApiJS() {
    this.gmapjs.parentNode.removeChild(this.js);
  }
  ngOnDestroy() {
    this.removeGApiJS();
  }
}
