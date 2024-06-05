---
name: Coding
tools: [C#, Html, Markdown]
image: 
description: Coding I have used in games
---

* TOC
{:toc}

---
1.CameraCollision.cs
`using System.Collections;`
`using System.Collections.Generic;`
`using UnityEngine;`

`//How to use`
`//Create an empty game object, call it "CameraBase" and then add the component - "Camera Follow" to it.`
`//Create another empty game object and parent/place it on the hips/pelvis bone of your character/player`
`//Then parent the MainCamera to this object and apply the "CameraCollision" to the camera.`

``[AddComponentMenu("Filmstorm/Camera Collision")]`
`public class CameraCollision : MonoBehaviour {`

	`public float minDistance = 1.0f;`
	`public float maxDistance = 5.0f;`
	`public float smooth = 10.0f;`
	`Vector3 dollyDir;`
	`public Vector3 dollyDirAdjusted;`
	`public float distance;

	// Use this for initialization
	void Awake () {
		dollyDir = transform.localPosition.normalized;
		distance = transform.localPosition.magnitude;
	}

	// Update is called once per frame
	void Update () {

		Vector3 desiredCameraPos = transform.parent.TransformPoint (dollyDir * maxDistance);
		RaycastHit hit;

		if (Physics.Linecast (transform.parent.position, desiredCameraPos, out hit)) {
			distance = Mathf.Clamp ((hit.distance * 0.87f), minDistance, maxDistance);

		} else {
			distance = maxDistance;
		}

		transform.localPosition = Vector3.Lerp (transform.localPosition, dollyDir * distance, Time.deltaTime * smooth);
	}
}``

---

---
2. CameraFollow
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//How to use
//Create an empty game object, call it "CameraBase" and then add this component - "Camera Follow" to it.
//Create another empty game object and parent/place it on the hips/pelvis bone of your character/player
//Then parent the MainCamera to this object and apply the "CameraCollision" to the camera. 

[AddComponentMenu("Filmstorm/Camera Follow")]
public class CameraFollow : MonoBehaviour {
	[Header("Drag the Object you want to follow here")]
	[Space(5)]
	[Tooltip("The best way to use this is to create an empty gameobject and parent it to your players hip/pelvis bone.")]
	public GameObject CameraFollowObj;

	[Header("Adjust these values to how you want the camera to rotate")]
	[Space(5)]
	public float CameraMoveSpeed = 120.0f;
	public float clampAngle = 80.0f;
	public float inputSensitivity = 150.0f;

	Vector3 FollowPOS;
	GameObject CameraObj;
	GameObject PlayerObj;
	float camDistanceXToPlayer;
	float camDistanceYToPlayer;
	float camDistanceZToPlayer;
	float mouseX;
	float mouseY;
	float finalInputX;
	float finalInputZ;
	float smoothX;
	float smoothY;
	float rotY = 0.0f;
	float rotX = 0.0f;
	float inputX;
	float inputZ;
	GameObject player;



	// Use this for initialization
	void Start () {
		player = GameObject.FindGameObjectWithTag ("Player");
		Vector3 rot = transform.localRotation.eulerAngles;
		rotY = rot.y;
		rotX = rot.x;
		Cursor.lockState = CursorLockMode.Locked;
		Cursor.visible = false;

	}

	// Update is called once per frame
	void Update () {

		// We setup the rotation of the sticks here
		//inputX = Input.GetAxis ("RightStickHorizontal");
		//inputZ = Input.GetAxis ("RightStickVertical");
		//mouseX = Input.GetAxis ("Mouse X");
		//mouseY = Input.GetAxis ("Mouse Y");
		//finalInputX = inputX + mouseX;
		//finalInputZ = inputZ + mouseY;

		//rotY += finalInputX * inputSensitivity * Time.deltaTime;
		//rotX += finalInputZ * inputSensitivity * Time.deltaTime;

		//rotX = Mathf.Clamp (rotX, -clampAngle, clampAngle);

		//Quaternion localRotation = Quaternion.Euler (rotX, rotY, 0.0f);
		//transform.rotation = localRotation;



	}

	void LateUpdate () {
		CameraUpdater ();
	}

	void CameraUpdater() {
		// set the target object to follow
		Transform target = CameraFollowObj.transform;

		//move towards the game object that is the target
		float step = CameraMoveSpeed * Time.deltaTime;
		transform.position = Vector3.MoveTowards (transform.position, target.position, step);
	}
}
---

---
3. ChangeMusicVolume.

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 


public class ChangeMusicVolume : MonoBehaviour {



	public Slider Volume;
	public AudioSource myMusic;
	
	// Update is called once per frame
	void Update () {
		myMusic.volume = Volume.value;
	}
}

---

---
4. Destroybytime
﻿using UnityEngine;
using System.Collections;

public class DestroyByTime : MonoBehaviour
{
    public float lifetime;

    void Start()
    {
        Destroy(gameObject, lifetime);
    }
} 

----

---
5.MouseOrbitImproved

﻿using UnityEngine;
using System.Collections;

[AddComponentMenu("Camera-Control/Mouse Orbit with zoom")]
public class MouseOrbitImproved : MonoBehaviour {

	public Transform target;
	public float distance = 5.0f;
	public float xSpeed = 120.0f;
	public float ySpeed = 120.0f;

	public float yMinLimit = -20f;
	public float yMaxLimit = 80f;

	public float distanceMin = .5f;
	public float distanceMax = 15f;

	private Rigidbody rigidbody;

	float x = 0.0f;
	float y = 0.0f;

	// Use this for initialization
	void Start () 
	{
		Vector3 angles = transform.eulerAngles;
		x = angles.y;
		y = angles.x;

		rigidbody = GetComponent<Rigidbody>();

		// Make the rigid body not change rotation
		if (rigidbody != null)
		{
			rigidbody.freezeRotation = true;
		}
	}

	void LateUpdate () 
	{
		if (target) 
		{
			x += Input.GetAxis("Mouse X") * xSpeed * distance * 0.02f;
			y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02f;

			y = ClampAngle(y, yMinLimit, yMaxLimit);

			Quaternion rotation = Quaternion.Euler(y, x, 0);

			distance = Mathf.Clamp(distance - Input.GetAxis("Mouse ScrollWheel")*5, distanceMin, distanceMax);

			RaycastHit hit;
			if (Physics.Linecast (target.position, transform.position, out hit)) 
			{
				distance -=  hit.distance;
			}
			Vector3 negDistance = new Vector3(0.0f, 0.0f, -distance);
			Vector3 position = rotation * negDistance + target.position;

			transform.rotation = rotation;
			transform.position = position;
		}
	}

	public static float ClampAngle(float angle, float min, float max)
	{
		if (angle < -360F)
			angle += 360F;
		if (angle > 360F)
			angle -= 360F;
		return Mathf.Clamp(angle, min, max);
	}
}

---
