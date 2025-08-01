/*
Author       : Dreamguys
Template Name: Doccure - Bootstrap Template
Version      : 1.0
*/

(function($) {
    "use strict";
	
	// Pricing Options Show
	
	$('#pricing_select input[name="rating_option"]').on('click', function() {
		if ($(this).val() == 'price_free') {
			$('#custom_price_cont').hide();
		}
		if ($(this).val() == 'custom_price') {
			$('#custom_price_cont').show();
		}
		else {
		}
	});
	
	// Education Add More
	
    $(".education-info").on('click','.trash', function () {
		$(this).closest('.education-cont').remove();
		return false;
    });

    $(".add-education").on('click', function () {
		
		var educationcontent = '<div className="row form-row education-cont">' +
			'<div className="col-12 col-md-10 col-lg-11">' +
				'<div className="row form-row">' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>Degree</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>College/Institute</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>Year of Completion</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-2 col-lg-1"><label className="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a></div>' +
		'</div>';
		
        $(".education-info").append(educationcontent);
        return false;
    });
	
	// Experience Add More
	
    $(".experience-info").on('click','.trash', function () {
		$(this).closest('.experience-cont').remove();
		return false;
    });

    $(".add-experience").on('click', function () {
		
		var experiencecontent = '<div className="row form-row experience-cont">' +
			'<div className="col-12 col-md-10 col-lg-11">' +
				'<div className="row form-row">' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>Hospital Name</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>From</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>To</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
					'<div className="col-12 col-md-6 col-lg-4">' +
						'<div className="form-group">' +
							'<label>Designation</label>' +
							'<input type="text" className="form-control">' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-2 col-lg-1"><label className="d-md-block d-sm-none d-none">&nbsp;</label><a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a></div>' +
		'</div>';
		
        $(".experience-info").append(experiencecontent);
        return false;
    });
	
	// Awards Add More
	
    $(".awards-info").on('click','.trash', function () {
		$(this).closest('.awards-cont').remove();
		return false;
    });

    $(".add-award").on('click', function () {

        var regcontent = '<div className="row form-row awards-cont">' +
			'<div className="col-12 col-md-5">' +
				'<div className="form-group">' +
					'<label>Awards</label>' +
					'<input type="text" className="form-control">' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-5">' +
				'<div className="form-group">' +
					'<label>Year</label>' +
					'<input type="text" className="form-control">' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-2">' +
				'<label className="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';
		
        $(".awards-info").append(regcontent);
        return false;
    });
	
	// Membership Add More
	
    $(".membership-info").on('click','.trash', function () {
		$(this).closest('.membership-cont').remove();
		return false;
    });

    $(".add-membership").on('click', function () {

        var membershipcontent = '<div className="row form-row membership-cont">' +
			'<div className="col-12 col-md-10 col-lg-5">' +
				'<div className="form-group">' +
					'<label>Memberships</label>' +
					'<input type="text" className="form-control">' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-2 col-lg-2">' +
				'<label className="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';
		
        $(".membership-info").append(membershipcontent);
        return false;
    });
	
	// Registration Add More
	
    $(".registrations-info").on('click','.trash', function () {
		$(this).closest('.reg-cont').remove();
		return false;
    });

    $(".add-reg").on('click', function () {

        var regcontent = '<div className="row form-row reg-cont">' +
			'<div className="col-12 col-md-5">' +
				'<div className="form-group">' +
					'<label>Registrations</label>' +
					'<input type="text" className="form-control">' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-5">' +
				'<div className="form-group">' +
					'<label>Year</label>' +
					'<input type="text" className="form-control">' +
				'</div>' +
			'</div>' +
			'<div className="col-12 col-md-2">' +
				'<label className="d-md-block d-sm-none d-none">&nbsp;</label>' +
				'<a href="#" className="btn btn-danger trash"><i className="far fa-trash-alt"></i></a>' +
			'</div>' +
		'</div>';
		
        $(".registrations-info").append(regcontent);
        return false;
    });
	
})(jQuery);